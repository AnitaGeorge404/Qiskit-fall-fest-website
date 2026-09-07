from html.parser import HTMLParser

class MyHTMLParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.in_body = False
        self.depth = 0
        self.tags = []
        
    def handle_starttag(self, tag, attrs):
        if tag == 'body':
            self.in_body = True
        if self.in_body:
            attr_str = " ".join([f"{k}='{v}'" for k,v in attrs if k in ["class", "id", "data-pex"]])
            print("  " * self.depth + f"<{tag} {attr_str}>")
            self.depth += 1

    def handle_endtag(self, tag):
        if self.in_body:
            self.depth -= 1
        if tag == 'body':
            self.in_body = False

    def handle_data(self, data):
        data = data.strip()
        if self.in_body and data and not data.startswith("/*") and "{" not in data:
            print("  " * self.depth + data[:100])

with open("extracted-1788776318918/page.html", "r", encoding="utf-8") as f:
    parser = MyHTMLParser()
    parser.feed(f.read())
