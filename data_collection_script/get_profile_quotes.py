import codecs
import json
import re
import requests

from bs4 import BeautifulSoup
from local_settings import apikey

quotes = []
data = requests.get("http://quotesnhumor.com/top-40-funniest-minions-memes/")
soup = BeautifulSoup(data.text, 'lxml')

for url in [img['src'] for img in soup.findAll('img', {'class': 'size-full'})]:

    # Use OCR api to translate meme images into text
    response = json.loads(
        requests.post(
            url="https://api.ocr.space/parse/image",

            data={
                "url": url,
                "isOverlayRequired": "false",
                "apikey": apikey
            }
        ).content
    )

    if response.get("ParsedResults") and len(response["ParsedResults"]) > 0:
        # Clean up parsing
        cleaned_result = re.sub(
            r"\s+",
            " ",
            response['ParsedResults'][0]['ParsedText']\
                .replace("...", " ")\
                .replace('"', '\"')
        ).strip()
        print(cleaned_result)
        quotes.append(cleaned_result)

# Write to data/profile-quotes
with codecs.open('public/data/profile-quotes.json', 'w', encoding='utf-8') as quote_file:
    quote_string = u"[\"{}\"]".format(u'", "'.join(quotes))
    quote_file.write(quote_string)
