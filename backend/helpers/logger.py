class Logger:
    def __init__(self, filename: str) -> None:
        self.filename = f"logs/{filename}"

    def read(self):
        with open(self.filename, "r") as file:
            return file.read()

    def append(self, content: str):
        with open(self.filename, "a") as file:
            file.write(f"\n{content}")

    def clear(self):
        with open(self.filename, "w") as file:
            file.truncate(0)
