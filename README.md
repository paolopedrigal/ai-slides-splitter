# AI Presentation Slides Splitter

## Description

The goal of this project is to develop a program that leverages an LLM to split a document into sections. Ultimately, these sections would eventually become slides for a ready-to-go presentation.

## Tech Used

- ReactJS
- NextJs
- Chakra UI
- [AI JSX](https://docs.ai-jsx.com/)
- OpenAI API (gpt-4o-mini model)

## Steps to run application

1. Create your own OpenAI API Key from the [OpenAI dashboard](https://platform.openai.com/api-keys).
2. Install [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/), if not already installed.
3. Run the below commands:

   ```
    $ docker build -t splitter .
    $ docker run -e OPENAI_API_KEY=<your api key> -p 3000:3000 splitter
   ```

4. Prompt locally at [http://localhost:3000/](http://localhost:3000/)

## Notes

### Currently in the works

If time allows, I am planning on rendering the output of the slides in markdown with the [remark](https://github.com/remarkjs/remark) library. More to come soon.

### Why I chose GPT-4o Mini

I initially chose OpenAI's GPT-4o Mini because this is honestly the LLM I've worked with the most. But, after doing more [research](https://www.nebuly.com/blog/gpt-4o-mini-vs-claude-3-haiku-vs-gemini-1-5-flash), I continued to use GPT-4o Mini, since it yields the highest MMLU, which I believe would be more helpful in categorizing the slides for this assignment.

- I realize that GPT-4o Mini yields the smallest context window, so if larger documents (slides greater than 50) would be used as inputs, I'd also consider Gemini 1.5 Flash.

### Parameter Tuning

In my previous solution/commit in Python, I was able to utilize the `n` parameter (which allows for `n` number of choices to select from the generated output). This parameter was helpful, as I was able to select a most desired output of the choices given (e.g. selecting a choice that met the right number of slides). However, the `n` parameter isn't included as a prop for the `ChatCompletion` component, leading to some undesired outputs. As a result, the `temperature` parameter or re-writing some the `ChatCompletion` implementation to have the `n` parameter as a prop might be considered.

Since the prompt would be accepting an _entire_ markdown document provided by the user, my prompt (the `userMessage` variable in the prompt API route) had to be extra explicit (or at least more than I'd usually prompt) pertaining to the requirements of the task.

### Outside of this project scope / Future considerations

As mentioned above, adding the `n` parameter for the `ChatCompletion` component would be helpful so that the developer would have the ability to further pre-process/filter the generated output from the array of `n` choices.

Also, I'd recommend fine-tuning to create a _custom model_ for possibly better results, if allowed to use a different model than gpt-4o-mini, claude-3-haiku, gemini-1.5-flash.

- However, I'd need to generate own dataset train the new model, so we'd have our own model geared toward slideshow presentations.
