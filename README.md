# AI Engineer Homework for Gamma

Submission by Paolo Pedrigal | paolopedrigal@gmail.com | [https://www.linkedin.com/in/paolopedrigal/](LinkedIn)

## Description

The goal of this assignment is to develop a program that leverages an LLM to split a document into sections. Ultimately, these sections would eventually become slides for a ready-to-go presentation @ Gamma.

## Tech Used

- Python
- OpenAI API (gpt-4o-mini model)
- Docker

## Steps to run submission

1. Install [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/), if not yet installed.
2. Create your own [OpenAI API Key](https://platform.openai.com/api-keys).

3. Once you have your key, create an `.env` file at the root directory (like `.env.example`) and set the environment variable at `OPENAI_API_KEY`.

4. Run the applications via docker compose.

   ```
   docker-compose up --build
   ```

   - Use the `--build` flag for the initial run only or for changes in the `Dockerfile`

## Notes

### Currently in the works

I'm planning on refactoring this solution to use [AIJSX](https://www.npmjs.com/package/@gammatech/aijsx) instead of Python. More to come soon.

### Why I chose Python and GPT-4o Mini

Not only would I naturally use Python for data science and machine learning tasks as I did in previous work and projects, I believe this PL is good for small tasks (like this assignment) and for readability (for you to check my solution).

- However, I am currently working on a solution in AIJSX!

I initially chose OpenAI's GPT-4o Mini because this is honestly the LLM I've worked with the most out of the 3 allowed. But, after doing more [research](https://www.nebuly.com/blog/gpt-4o-mini-vs-claude-3-haiku-vs-gemini-1-5-flash), I continued to use GPT-4o Mini, since it yields the highest MMLU, which I believe would be more helpful in categorizing the slides for this assignment.

- I realize that GPT-4o Mini yields the smallest context window, so if larger documents (slides greater than 50) would be used as inputs, I'd also consider Gemini 1.5 Flash.

### Parameter Tuning

After iterating my prompts for the model, I found it best to use at around 5-12 chat completion choices (the `n` parameter in the `create` API call) for decently splitting a slideshow presentation. However, to meet the _exact_ target slides, `n` would need to be around 12-20. I chose to use multiple chat completion choices in the first place due to the model outputting undesired results (e.g. not meeting the target number of slides).

Additionally, since the prompt would be accepting an _entire_ markdown document provided by the user, my prompt (the `prompt` variable in the main solution file) had to be extra explicit (or at least more than I'd usually prompt) pertaining to the requirements of the task.

### Outside of this project scope

I'd recommend fine-tuning to create a _custom model_ for possibly better results, if allowed to use a different model than gpt-4o-mini, claude-3-haiku, gemini-1.5-flash.

- However, I'd need to generate own dataset train the new model, so we'd have our own model geared toward slideshow presentations.
