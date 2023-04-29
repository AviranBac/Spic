import time

from fastapi import FastAPI
from transformers import pipeline

start = time.time()
bert_model_name = "avichr/heBERT"
fill_mask_nlp = pipeline(
    "fill-mask",
    model=bert_model_name,
    tokenizer=bert_model_name
)
print("Amount of seconds for pipeline creation: " + "{:.2f}".format((time.time() - start), 2) + "s")

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/unmask/{start}/{end}")
async def unmask_sequence(start: str, end: str):
    start_time = time.time()

    # [MASK] marks a SINGLE missing word. e.g:
    # "אני רוצה [MASK] גלידה"
    masked_sequence = start + " [MASK] " + end

    results = fill_mask_nlp(masked_sequence, top_k=10)
    print("Amount of seconds for completed sequence: " + "{:.2f}".format((time.time() - start_time), 2) + "s")

    print("Masked sequence: " + masked_sequence[::-1])
    for index, result in enumerate(results):
        print("Sequence " + str(index + 1) + ": " + result['sequence'][::-1] + ", score: " + str(result['score']))
    return results
