from split_slides.config import OPENAI_API_KEY
from split_slides.utils import print_slides
from openai import OpenAI

client = OpenAI(api_key=OPENAI_API_KEY)
MODEL = "gpt-4o-mini"

def split_slides(document: str, target: int, model: str = MODEL) -> [str]:
    """
    Divides a markdown document into `target` number of slides for presentation slides @ Gamma.

    Args:
        document (str): input markdown document.
        target (int): number of slides to split into.
        model (str): LLM model to use

    Returns:
        list[str]: list of slides preserving original content.
    """
    slides = []
    delimiter = "!!!!"
    num_choices = 18
    model_context = (
        "You are highly skilled text processor that analyzes markdown documents for slideshow presentations. " 
        "The markdown document provided by the user will be delimited by triple quotes (\"\"\")."
        "Don't add any conversational dialogue to the user."
    )
    prompt = (
        "Task:\n\n"
        f"I am making a slideshow presentation, so please partition the entire document below into exactly {target} slides, separating the slides by the delimiter \"{delimiter}\".\n\n"
        "Requirements:\n"
        f"\t1. There should be exactly {target} slides and {target - 1} delimiters.\n"
        "\t2. Each partition, excluding the delimiters, can be joined back together to recreate the original document without any missing content or changes.\n"
        "\t3. Partitions must group content based on similarity, such as topics or themes, and should be logical and meaningful.\n"
        "\t4. No part of the original document should overlap or be omitted from the partitions. Sentences should not be cut off between slides\n"
        f"\t5. Do not modify or add content within the partitions; they should remain identical to the original document.\n\n"
        f"Document:\n\n\"\"\"{document}\"\"\"\n"
    )
    params = {
        "model":model,
        "messages":[
            {"role": "developer", "content": model_context},
            {"role": "user", "content": prompt}
        ],
        "n": num_choices,
    }
    completion = client.chat.completions.create(**params)
    for i in range(len(completion.choices)):
        slides = completion.choices[i].message.content.split(delimiter)
        # More text-processing (remove markdown delimiters)
        if (slides[0][:11] == "```markdown"): 
            slides[0] = slides[0][11:]
        if (slides[-1][-3:] == "```"):
            slides[-1] = slides[-1][:-3]
        if len(slides) == target: # If met desired number of slides
            break
    return slides

if __name__ == "__main__":
    file_path = "./split_slides/tests/inputs/input1.txt"
    with open(file_path, "r") as f:
        slides = split_slides(f.read(), 25)
        print_slides(slides)
