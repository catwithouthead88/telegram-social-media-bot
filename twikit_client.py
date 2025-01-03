import asyncio
from twikit import Client

USERNAME = 'example_user'
EMAIL = 'email@example.com'
PASSWORD = 'password0000'

client = Client('en-US')

async def login_and_tweet(text):
    await client.login(
        auth_info_1=USERNAME,
        auth_info_2=EMAIL,
        password=PASSWORD
    )
    await client.create_tweet(text=text)

def main(text):
    asyncio.run(login_and_tweet(text))

if __name__ == "__main__":
    import sys
    main(sys.argv[1])