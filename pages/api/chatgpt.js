import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handle(req, res) {
  const { prompt, loginCode } = req.body;
  if (loginCode !== process.env.OPENAI_AUTH_KEY) {
    res.status(200).json({
      error: {
        message: "点击右上角登录后使用",
      },
    });
    return;
  }
  if (!configuration.apiKey) {
    res.status(200).json({
      error: {
        message:
          "OpenAI API key not configured, please follow instructions in README.md",
      },
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      max_tokens: 1000,
      temperature: 0.6,
    });

    const reply = completion.data.choices[0].text;
    res.status(200).json({ reply });
  } catch (error) {
    res.status(200).json({ error: error });
  }
}
