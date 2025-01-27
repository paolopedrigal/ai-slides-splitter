from split_slides.main import split_slides
from pathlib import Path
import pytest

def test_reformation():
    SLIDE_COUNT = 10
    with open(Path(__file__).parent / 'inputs/input1.txt', encoding='utf8') as document:
        print("Running test(s) for input1.txt")
        slides = split_slides(document.read(), 10)
        assert "".join(slides) == document.read()

def test_slide_count():
    slide_count = 25
    with open(Path(__file__).parent / 'inputs/input1.txt', encoding='utf8') as document:
        print("Running test(s) for input1.txt")
        slides = split_slides(document.read(), slide_count)
        assert len(slides) == slide_count


