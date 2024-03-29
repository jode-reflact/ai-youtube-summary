import openai
import time


class VideoSummary:
    def __init__(self,  organization, api_key, model, split_length) -> None:
        self.organization = organization
        self.api_key = api_key
        self.model = model
        self.split_length = split_length

    def _generate_prompt(self, text):
        template = """
            You are a Video Summarization Specialist.
            Summarize the content of the following video script.
            ```txt
            {script}
            ```
            """
        return template.format(script=text)

    def _split_prompt(self, text, split_length):
        if split_length <= 0:
            raise ValueError("Max length must be greater than 0.")
        num_parts = -(-len(text) // split_length)
        context_data = []
        for i in range(num_parts):
            start = i * split_length
            end = min((i + 1) * split_length, len(text))

            if i == num_parts - 1:
                content = f'[START PART {i + 1}/{num_parts}]\n' + \
                    text[start:end] + f'\n[END PART {i + 1}/{num_parts}]'
                content += '\nALL PARTS SENT. Now you can continue processing the request. You are a Summarization Specialist. Summarize the content of the video script given to you in all the parts.'
            else:
                content = f'Do not answer yet. This is just another part of the text I want to send you. Just receive and acknowledge as "Part {i + 1}/{num_parts} received" and wait for the next part.\n[START PART {i + 1}/{num_parts}]\n' + text[
                    start:end] + f'\n[END PART {i + 1}/{num_parts}]'
                content += f'\nRemember not answering yet. Just acknowledge you received this part with the message "Part {i + 1}/{num_parts} received" and wait for the next part.'
            context_data.append(content)
        return context_data

    def chat_completion(self, text):
        openai.api_key = self.api_key
        prompts = self._split_prompt(text, self.split_length)
        index = 1
        print("Sending parts to OpenAI API. This may take a while.")
        for prompt in prompts:
            print(f"Sending part {index} of {len(prompts)}")
            messages = []
            message = {"role": "user", "content": prompt}
            messages.append(message)
            completion = openai.ChatCompletion.create(
                model=self.model, messages=messages)
            time.sleep(20)
            index += 1
        return completion.choices[0].message.content
