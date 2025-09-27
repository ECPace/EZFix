import Tesseract from "tesseract.js";

/**
 * Extrai texto de uma imagem usando Tesseract.js
 * @param imageUrl URL da imagem ou caminho local
 */
export const extrairTextoDaImagem = async (imageUrl: string): Promise<string> => {
    try {
        const result = await Tesseract.recognize(imageUrl, "por"); // OCR em portugu�s
        return result.data.text;
    } catch (error) {
        console.error("Erro no OCR:", error);
        throw new Error("Falha ao processar OCR");
    }
};

/**
 * Gera uma nota autom�tica simples baseada no texto
 * (placeholder para IA mais avan�ada no futuro)
 */
export const gerarNotaAutomatica = (texto: string): number => {
    if (!texto || texto.trim().length === 0) return 0;

    // Exemplo simples: pontuar pelo n�mero de palavras
    const palavras = texto.trim().split(/\s+/).length;

    if (palavras < 50) return 2.0;   // reda��o muito curta
    if (palavras < 150) return 5.0;  // tamanho m�dio
    if (palavras < 300) return 7.0;  // bom
    return 9.0;                      // muito bom
};
