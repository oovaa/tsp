// Step 1: Import the Langchain library
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { HNSWLib } from "@langchain/community/vectorstores/hnswlib";

import fs from 'fs/promises';

try {
    const text = await fs.readFile('scrimba-info.txt', 'utf-8')

    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 700,
        chunkOverlap: 0,
        separators: ['\n\n', '\n', ' ', '']
    })

    let out = await splitter.createDocuments([text])
    out.forEach(x => {
        console.log(x.pageContent);
        console.log(x.metadata.loc);
    })

    const openAIkey = process.env.OPENAI_API_KEY

} catch (err) {
    console.error(err);
}