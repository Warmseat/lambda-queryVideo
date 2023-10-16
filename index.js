const YoutubeLoader = require("langchain/document_loaders/web/youtube").YoutubeLoader;
const FaissStore = require("langchain/vectorstores/faiss").FaissStore;
const OpenAIEmbeddings = require("langchain/embeddings/openai").OpenAIEmbeddings;
const RecursiveCharacterTextSplitter = require("langchain/text_splitter").RecursiveCharacterTextSplitter;
const RetrievalQAChain = require("langchain/chains").RetrievalQAChain;
const ChatOpenAI = require("langchain/chat_models/openai").ChatOpenAI;
// const MemoryVectorStore = require("langchain/vectorstores/memory").MemoryVectorStore;
// const Document = require("langchain/document").Document;

exports.handler = async (event) => {
  console.log('queryVideo v0.0.65')
  // console.log('heres the event!: ', event);

  let youtubeURL = event.youtubeURL;
  let userQuery = event.query;
  
  const loader = YoutubeLoader.createFromUrl(youtubeURL, {
  language: "en",
  addVideoInfo: false,
  });

  // // Load the data  
  const data = await loader.load();

  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 100,
  });

  // Split the the data into chunks
  const splitDocs = await textSplitter.splitDocuments(data);

  const vectorStore = await FaissStore.fromDocuments(
    splitDocs,
    new OpenAIEmbeddings()
  );

  const model = new ChatOpenAI({ modelName: "gpt-3.5-turbo" });
  const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever());

  const queryResponse = await chain.call({
    query: userQuery,
  });



  const response = {
    statusCode: 200,
    body: JSON.stringify('Answer ', queryResponse),
    // body: JSON.stringify('URL: ' + youtubeURL + '. Query: ' + userQuery),
  };
  return response;
};
