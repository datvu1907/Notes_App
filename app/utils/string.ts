export function getPreviewText(content: string, wordCount = 20) {
  const words = content.split(" ")
  if (words.length <= wordCount) return content
  return words.slice(0, wordCount).join(" ") + "..."
}
