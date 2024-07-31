// Step 1: Import the Langchain library
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { HNSWLib } from "@langchain/community/vectorstores/hnswlib";
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'

import fs from 'fs/promises';

try {
    const text = await fs.readFile('scrimba-info.txt', 'utf-8')

    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 700,
        chunkOverlap: 0,
        separators: ['\n\n', '\n', ' ', '']
    })

    const splited = await splitter.createDocuments([text]);

    const openAIkey = process.env.OPENAI_API_KEY;

    if (openAIkey) {
        const embeddings = new OpenAIEmbeddings({
            openAIApiKey: openAIkey
        });
    }

} catch (err) {
    console.error(err);
}