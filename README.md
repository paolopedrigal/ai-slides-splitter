# AI Engineer Homework for Gamma

Submission by Paolo Pedrigal | paolopedrigal@gmail.com | [https://www.linkedin.com/in/paolopedrigal/](LinkedIn)

## Description

The goal of this assignment is to develop a program that leverages an LLM to split a document into sections. Ultimately, these sections would eventually become slides for a ready-to-go presentation @ Gamma.

## Tech Used

- ReactJS
- NextJs
- Chakra UI
- [AI JSX](https://docs.ai-jsx.com/)
- OpenAI API (gpt-4o-mini model)

## Steps to run submission

1. Create your own OpenAI API Key from the [OpenAI dashboard](https://platform.openai.com/api-keys).

2. Follow the below commands:

   ```
    $ export OPENAI_API_KEY=<your OpenAI API key>
    $ npm install
    $ npm start
   ```

## Notes

### Currently in the works

I'm currently containerizing this application. Additionally, I need to tune the parameters for more consistent outputs. If time allows, I am planning on rendering the output of the slides in markdown with the [remark](https://github.com/remarkjs/remark) library. More to come soon.

### Why I chose GPT-4o Mini

I initially chose OpenAI's GPT-4o Mini because this is honestly the LLM I've worked with the most out of the 3 allowed. But, after doing more [research](https://www.nebuly.com/blog/gpt-4o-mini-vs-claude-3-haiku-vs-gemini-1-5-flash), I continued to use GPT-4o Mini, since it yields the highest MMLU, which I believe would be more helpful in categorizing the slides for this assignment.

- I realize that GPT-4o Mini yields the smallest context window, so if larger documents (slides greater than 50) would be used as inputs, I'd also consider Gemini 1.5 Flash.

### Parameter Tuning

Since the prompt would be accepting an _entire_ markdown document provided by the user, my prompt (the `prompt` variable in the main solution file) had to be extra explicit (or at least more than I'd usually prompt) pertaining to the requirements of the task.

### Outside of this project scope

I'd recommend fine-tuning to create a _custom model_ for possibly better results, if allowed to use a different model than gpt-4o-mini, claude-3-haiku, gemini-1.5-flash.

- However, I'd need to generate own dataset train the new model, so we'd have our own model geared toward slideshow presentations.
