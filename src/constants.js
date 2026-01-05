import "dotenv/config";

const constants = {
    PORT: process.env.PORT,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    OPENAI_API_MODEL: process.env.OPENAI_API_MODEL,
}

export default constants;