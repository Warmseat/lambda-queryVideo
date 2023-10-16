const YoutubeLoader = require("langchain/document_loaders/web/youtube").YoutubeLoader;
const FaissStore = require("langchain/vectorstores/faiss").FaissStore;
const OpenAIEmbeddings = require("langchain/embeddings/openai").OpenAIEmbeddings;
const RecursiveCharacterTextSplitter = require("langchain/text_splitter").RecursiveCharacterTextSplitter;
const RetrievalQAChain = require("langchain/chains").RetrievalQAChain;
const ChatOpenAI = require("langchain/chat_models/openai").ChatOpenAI;
// const MemoryVectorStore = require("langchain/vectorstores/memory").MemoryVectorStore;
// const Document = require("langchain/document").Document;

exports.handler = async (event) => {
  // TODO implement
  console.log('queryVideo v0.0.3')
  console.log('heres the event!: ', event);
  const response = {
    statusCode: 200,
    body: JSON.stringify('URL: ' + event.youtubeURL + '. Query: ' + event.query),
  };
  return response;
};
