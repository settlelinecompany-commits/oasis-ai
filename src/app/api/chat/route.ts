import { NextRequest, NextResponse } from 'next/server'
import { searchContractVectors } from '@/lib/qdrant'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json()
    
    if (!message) {
      return NextResponse.json(
        { success: false, error: 'Message is required' },
        { status: 400 }
      )
    }
    
    // Search Qdrant for relevant contract chunks
    const searchResults = await searchContractVectors(message, 'temp-user') // TODO: Replace with actual user_id
    
    if (searchResults.length === 0) {
      return NextResponse.json({
        success: true,
        answer: "I couldn't find any relevant information in your contracts. Please make sure you have uploaded contracts and try asking a different question.",
        sources: []
      })
    }
    
    // Prepare context from search results
    const context = searchResults.map(result => ({
      contract_no: result.payload?.contract_no,
      chunk_text: result.payload?.chunk_text,
      score: result.score
    }))
    
    // Generate answer using GPT-4 with context
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a helpful assistant that answers questions about rental contracts based on the provided contract excerpts. 

Rules:
- Only answer based on the contract information provided
- If the information isn't in the contracts, say so clearly
- Be specific and cite relevant contract details
- If asked about calculations, show your work
- Be helpful but don't make assumptions beyond what's in the contracts

Contract excerpts:
${context.map(c => `Contract: ${c.contract_no}\nText: ${c.chunk_text}\n`).join('\n')}`
        },
        {
          role: "user",
          content: message
        }
      ],
      temperature: 0.1,
    })
    
    const answer = completion.choices[0]?.message?.content || "I couldn't generate an answer."
    
    return NextResponse.json({
      success: true,
      answer,
      sources: context.map(c => ({
        contract_no: c.contract_no,
        chunk_text: c.chunk_text,
        relevance_score: c.score
      }))
    })
    
  } catch (error: any) {
    console.error('Chat error:', error)
    return NextResponse.json(
      { success: false, error: `Chat failed: ${error.message}` },
      { status: 500 }
    )
  }
}





import { searchContractVectors } from '@/lib/qdrant'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json()
    
    if (!message) {
      return NextResponse.json(
        { success: false, error: 'Message is required' },
        { status: 400 }
      )
    }
    
    // Search Qdrant for relevant contract chunks
    const searchResults = await searchContractVectors(message, 'temp-user') // TODO: Replace with actual user_id
    
    if (searchResults.length === 0) {
      return NextResponse.json({
        success: true,
        answer: "I couldn't find any relevant information in your contracts. Please make sure you have uploaded contracts and try asking a different question.",
        sources: []
      })
    }
    
    // Prepare context from search results
    const context = searchResults.map(result => ({
      contract_no: result.payload?.contract_no,
      chunk_text: result.payload?.chunk_text,
      score: result.score
    }))
    
    // Generate answer using GPT-4 with context
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a helpful assistant that answers questions about rental contracts based on the provided contract excerpts. 

Rules:
- Only answer based on the contract information provided
- If the information isn't in the contracts, say so clearly
- Be specific and cite relevant contract details
- If asked about calculations, show your work
- Be helpful but don't make assumptions beyond what's in the contracts

Contract excerpts:
${context.map(c => `Contract: ${c.contract_no}\nText: ${c.chunk_text}\n`).join('\n')}`
        },
        {
          role: "user",
          content: message
        }
      ],
      temperature: 0.1,
    })
    
    const answer = completion.choices[0]?.message?.content || "I couldn't generate an answer."
    
    return NextResponse.json({
      success: true,
      answer,
      sources: context.map(c => ({
        contract_no: c.contract_no,
        chunk_text: c.chunk_text,
        relevance_score: c.score
      }))
    })
    
  } catch (error: any) {
    console.error('Chat error:', error)
    return NextResponse.json(
      { success: false, error: `Chat failed: ${error.message}` },
      { status: 500 }
    )
  }
}










