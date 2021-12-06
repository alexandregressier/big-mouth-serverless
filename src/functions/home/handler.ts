import type { EventAPIGatewayProxyEvent } from "@libs/apiGateway"
import { middyfy } from "@libs/lambda"
import { readFile } from "fs/promises"

let html: Promise<Buffer>

const loadHtml: () => Promise<Buffer> = () =>
    html
        ? html
        : html = readFile("static/index.html")

const home: EventAPIGatewayProxyEvent = async () => ({
    statusCode: 200,
    headers: {
        "Content-Type": "text/html",
    },
    body: await loadHtml().then(html => `${html}`),
})

export const main = middyfy(home)