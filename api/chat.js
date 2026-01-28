export default async function handler(req, res) {
  // Разрешаем CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userMessage, clientName, clientAge, clientDebt, clientArchetype, isRude, history } = req.body;

    const systemMessage = `Ты участвуешь в учебной симуляции. Твоя задача - отыграть клиента.

ПЕРСОНАЖ: ${clientName}, ${clientAge} лет
СИТУАЦИЯ: задержка оплаты ${clientDebt} USDT
ХАРАКТЕР: ${clientArchetype}
${isRude ? 'ВАЖНО: Менеджер был груб - отреагируй агрессивно!' : ''}

ПРАВИЛА:
- Говори ТОЛЬКО на русском
- Отвечай КРАТКО (1-2 предложения)
- Веди себя как ${clientArchetype}
- НЕ выходи из роли

${history ? `История диалога:\n${history}\n\n` : ''}Менеджер: ${userMessage}

${clientName}:`;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 200,
        system: systemMessage,
        messages: [
          { role: "user", content: userMessage }
        ]
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error?.message || 'API error');
    }

    let reply = data.content[0].text.trim();
    reply = reply.replace(/^(Клиент:|Ответ:)/i, '').trim();

    return res.status(200).json({ response: reply });

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
