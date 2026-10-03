import { McpServer } from "@modelcontextprotocol/server";
import { createMcpHandler } from "agents/mcp/server";
import { z } from "zod";

function createServer() {
  const server = new McpServer({
    name: "The Curious Code MCP",
    version: "1.0.0",
  });

  server.registerTool(
    "hello",
    {
      description: "Test that The Curious Code MCP server is working",
      inputSchema: {
        name: z.string().optional(),
      },
    },
    async ({ name }) => ({
      content: [
        {
          type: "text",
          text: `Hello ${name ?? "from The Curious Code"}! MCP is working.`,
        },
      ],
    }),
  );

  return server;
}

export default {
  fetch(request, env, ctx) {
    return createMcpHandler(createServer)(request, env, ctx);
  },
} satisfies ExportedHandler;
