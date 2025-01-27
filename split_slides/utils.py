
def print_slides(slides: [str], is_quantity_included: bool = True) -> None:
    """
    Prints the content of presentation slides to the console with optional slide count.

    Args:
        slides (list[str]): A list of slides to print, where each slide is represented as a string.
        is_quantity_included (bool): Whether to print the total number of slides before printing the content.

    Returns:
        None: This function only prints the slides to the console.
    """
    if is_quantity_included:
        print("Number of slides:", len(slides), "\n")
        print("--------------------------------------------")
    for s in slides:
        print("--------------------------------------------")
        print(s)
        print("--------------------------------------------")
