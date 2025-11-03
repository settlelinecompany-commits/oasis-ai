import { QdrantClient } from '@qdrant/js-client-rest'
import OpenAI from 'openai'

const qdrant = new QdrantClient({
  url: process.env.QDRANT_URL || process.env.NEXT_PUBLIC_QDRANT_URL!,
  apiKey: process.env.QDRANT_API_KEY || process.env.NEXT_PUBLIC_QDRANT_API_KEY!,
  timeout: 10000,
  checkCompatibility: false, // Skip version check to avoid compatibility issues
})

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// Chunk text into 500-1000 character segments with 100 char overlap
export function chunkText(text: string): string[] {
  const chunkSize = 800
  const overlap = 100
  const chunks: string[] = []
  
  for (let i = 0; i < text.length; i += chunkSize - overlap) {
    const chunk = text.slice(i, i + chunkSize)
    if (chunk.trim()) {
      chunks.push(chunk.trim())
    }
  }
  
  return chunks
}

// Store contract vectors in Qdrant
export async function storeContractVectors(
  leaseId: number,
  ocrText: string,
  metadata: {
    tenant_id: number
    property_id: number
    contract_no: string
    user_id: string
  }
) {
  console.log('Starting storeContractVectors for lease:', leaseId)
  console.log('OCR text length:', ocrText.length)
  
  try {
    // Ensure collection exists
    await qdrant.createCollection('contract_vectors', {
      vectors: { size: 1536, distance: 'Cosine' }
    })
    console.log('Collection created or already exists')
  } catch (error) {
    // Collection might already exist, continue
    console.log('Collection already exists or error creating:', error)
  }

  // Chunk the OCR text
  const chunks = chunkText(ocrText)
  console.log('Created', chunks.length, 'chunks')
  
  // Generate embeddings for each chunk
  const points = []
  for (let i = 0; i < chunks.length; i++) {
    console.log(`Generating embedding for chunk ${i + 1}/${chunks.length}`)
    const embedding = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: chunks[i],
    })
    
    points.push({
      id: leaseId * 1000 + i, // Use numeric ID: 23000, 23001, 23002, etc.
      vector: embedding.data[0].embedding,
      payload: {
        ...metadata,
        chunk_index: i,
        chunk_text: chunks[i],
      }
    })
  }
  
  console.log('Generated', points.length, 'points, storing in Qdrant...')
  
  // Store in Qdrant
  const result = await qdrant.upsert('contract_vectors', {
    wait: true,
    points: points,
  })
  
  console.log('Qdrant upsert result:', result)
  console.log(`Stored ${points.length} vectors for lease ${leaseId}`)
}

// Search contract vectors
export async function searchContractVectors(
  query: string,
  userId?: string
) {
  // Generate query embedding
  const queryEmbedding = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: query,
  })
  
  // Build filter - for now, don't filter by user_id to test
  const filter: any = {}
  // if (userId) {
  //   filter.must = [{ key: 'user_id', match: { value: userId } }]
  // }
  
  // Search Qdrant
  const results = await qdrant.search('contract_vectors', {
    vector: queryEmbedding.data[0].embedding,
    limit: 5,
    filter: Object.keys(filter).length > 0 ? filter : undefined,
    with_payload: true,
  })
  
  return results
}






