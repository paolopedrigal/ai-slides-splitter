"use client";

import { useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { useAIStream } from "ai-jsx/react";
import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  For,
  HStack,
  Stack,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import {
  NumberInputField,
  NumberInputRoot,
} from "@/components/ui/number-input";

/**
 * A component that generates slides from an input markdown document.
 */
function SlidesGenerator() {
  const { current, fetchAI } = useAIStream({});
  const delimiter = "@@@";
  const [document, setDocument] = useState<string>("");
  const [target, setTarget] = useState<string>("20");
  const slidesRef = useRef<HTMLDivElement>(null);
  const handleScroll = () => {
    slidesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <Container centerContent padding="20px">
      <Flex direction="row" gap="4">
        <NumberInputRoot
          width="200px"
          defaultValue="20"
          value={target}
          onValueChange={(e) => setTarget(e.value)}
          min={1}
          max={50}
        >
          <NumberInputField />
        </NumberInputRoot>
        <Button
          disabled={document == ""}
          onClick={() => {
            if (document != "") {
              fetchAI("/api/split-slides", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ document, target, delimiter }),
              });
              handleScroll();
            }
          }}
        >
          Split into {target} Slides
        </Button>
      </Flex>
      <Container maxW={"5xl"} padding="20px" centerContent>
        <Textarea
          autoresize
          placeholder="Insert markdown document here"
          value={document}
          onChange={(e) => setDocument(e.currentTarget.value)}
          style={{ width: "100%" }}
        />
      </Container>
      <br />
      <div ref={slidesRef}>
        {current && (
          <Stack>
            <For each={(current as string[]).join(``).split(delimiter)}>
              {(item, index) => (
                <Box borderWidth="1px" key={index} p="4">
                  <HStack gap="25px">
                    <Badge colorPalette="teal" variant="solid">
                      {index + 1}
                    </Badge>
                    <VStack>
                      <ReactMarkdown>{item}</ReactMarkdown>
                    </VStack>
                  </HStack>
                </Box>
              )}
            </For>
          </Stack>
        )}
      </div>
    </Container>
  );
}

export default function Home() {
  return <SlidesGenerator />;
}
