import re
import time
from typing import List

import uvicorn
from chatgpt import Conversation, ChatgptError
from fastapi import FastAPI
from fastapi.params import Query


def initConversation():
    _conversation = Conversation(config_path="../config.json")
    _conversation.stream(["Your next answers should be in Hebrew."])
    return _conversation


conversation = initConversation()
app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/completions")
async def completions(keywords: List[str] = Query(None), num_of_sentences: int = Query(5)):
    start_time = time.time()

    response = request_from_chatgpt(keywords, num_of_sentences)
    print(response)
    completions_list = filter_hebrew_in_response(response)[-num_of_sentences:]

    print("Amount of seconds for completions: " + "{:.2f}".format((time.time() - start_time), 2) + "s")
    return completions_list


def request_from_chatgpt(keywords: List[str], num_of_sentences: int):
    global conversation
    request = "Create {0} simple, common sentences in Hebrew with the following keywords in a way a child would say: "\
              "{1}. Your response should be ONLY a list with a breakline separating each sentence."\
        .format(num_of_sentences, ','.join(keywords))

    try:
        response = conversation.chat([request])
        return response
    except ChatgptError as chatgpt_error:
        try:
            message = chatgpt_error.message
            code = chatgpt_error.code
            print("Error Code: " + code.value + ", message: " + message)

            # Retry again, maybe access token revoked
            conversation = initConversation()
            response = conversation.chat([request])
            return response
        except ChatgptError as chatgpt_error_2:
            message = chatgpt_error_2.message
            code = chatgpt_error_2.code
            print("Error Code: " + code.value + ", message: " + message)
            raise chatgpt_error_2
    except Exception as e:
        print(e)
        raise e

def filter_hebrew_in_response(response: str):
    hebrew_regex = re.compile('[^א-ת0-9 \-_.,!"\'/]')
    response_rows = response.split('\n')
    response_rows_after_regex = list(map(lambda row: hebrew_regex.sub('', row), response_rows))
    return list(filter(lambda row: re.compile('[א-ת]').search(row) and not re.compile('[A-Za-z]').search(row),
                       response_rows_after_regex))


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
