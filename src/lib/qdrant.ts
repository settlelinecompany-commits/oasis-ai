import { QdrantClient } from '@qdrant/js-client-rest'
import OpenAI from 'openai'

const qdrant = new QdrantClient({
  url: process.env.QDRANT_URL || process.env.NEXT_PUBLIC_QDRANT_URL!,
  apiKey: process.env.QDRANT_API_KEY || process.env.NEXT_PUBLIC_QDRANT_API_KEY!,
  timeout: 10000,
  checkCompatibility: false,
})

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const COLLECTION_NAME = 'contract_vectors'

// Initialize collection if it doesn't exist
async function ensureCollection() {
  try {
    const collections = await qdrant.getCollections()
    const exists = collections.collections.some(c => c.name === COLLECTION_NAME)
    
    if (!exists) {
      await qdrant.createCollection(COLLECTION_NAME, {
        vectors: {
          size: 1536, // OpenAI ada-002 embedding size
          distance: 'Cosine',
        },
      })
      console.log('Created Qdrant collection:', COLLECTION_NAME)
    }
  } catch (error) {
    console.error('Error ensuring collection:', error)
  }
}

// Store contract vectors in Qdrant
export async function storeContractVectors(
  leaseId: number,
  contractText: string,
  metadata: {
    tenant_id?: number
    property_id?: number
    contract_no?: string
    user_id?: string
  }
) {
  try {
    await ensureCollection()
    
    // Split text into chunks (approximately 1000 characters per chunk)
    const chunkSize = 1000
    const chunks: string[] = []
    for (let i = 0; i < contractText.length; i += chunkSize) {
      chunks.push(contractText.slice(i, i + chunkSize))
    }
    
    // Generate embeddings for each chunk
    const points = []
    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i]
      
      // Generate embedding using OpenAI
      const embeddingResponse = await openai.embeddings.create({
        model: 'text-embedding-ada-002',
        input: chunk,
      })
      
      const embedding = embeddingResponse.data[0].embedding
      
      // Create point with embedding and metadata
      points.push({
        id: `${leaseId}-${i}`,
        vector: embedding,
        payload: {
          lease_id: leaseId,
          chunk_index: i,
          chunk_text: chunk,
          contract_no: metadata.contract_no,
          tenant_id: metadata.tenant_id,
          property_id: metadata.property_id,
          user_id: metadata.user_id || 'temp-user',
        },
      })
    }
    
    // Upsert points to Qdrant
    await qdrant.upsert(COLLECTION_NAME, {
      wait: true,
      points,
    })
    
    console.log(`Stored ${points.length} chunks for lease ${leaseId}`)
    return { success: true, chunks_stored: points.length }
  } catch (error) {
    console.error('Error storing contract vectors:', error)
    throw error
  }
}

// Search contract vectors in Qdrant
export async function searchContractVectors(
  query: string,
  userId?: string,
  limit: number = 10
) {
  try {
    await ensureCollection()
    
    // Generate embedding for query
    const embeddingResponse = await openai.embeddings.create({
      model: 'text-embedding-ada-002',
      input: query,
    })
    
    const queryVector = embeddingResponse.data[0].embedding
    
    // Build filter if userId is provided
    const filter = userId
      ? {
          must: [
            {
              key: 'user_id',
              match: { value: userId },
            },
          ],
        }
      : undefined
    
    // Search Qdrant
    const searchResult = await qdrant.search(COLLECTION_NAME, {
      vector: queryVector,
      limit,
      filter,
      with_payload: true,
    })
    
    return searchResult
  } catch (error) {
    console.error('Error searching contract vectors:', error)
    throw error
  }
}

