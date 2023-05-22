import openai
import json


class videoSummary:
    def __init__(self,  organization, api_key, model) -> None:
        self.organization = organization
        self.api_key = api_key
        self.model = model

    def _generate_prompt(self, text):
        template = """
            You are a Video Summarization Specialist.
            Summarize the content of the following video script.
            ```txt
            {script}
            ```
            """
        return template.format(script=text)
        # script = json.load(f, encoding="utf-8")
        # print(script["text"])
        template = """
            You are a Video Summarization Specialist.
            Summarize the content of the following video script.
            ```txt
            {script}
            ```
            """
        return "草"
        # return template.format(script=script)

    def chat_completion(self, text):
        template = self._generate_prompt(text)
        openai.api_key = self.api_key
        completion = openai.ChatCompletion.create(
            model=self.model, messages=[{"role": "user", "content": template}])
        print(completion.choices[0].message.content)
        return completion.choices[0].message.content
