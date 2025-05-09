const configureOpenAI = () => {
  return {
    apiKey: process.env.OPENAI_API_KEY,
    organization: process.env.OPENAI_ORGANIZATION_KEY,
  };
};

export default configureOpenAI
