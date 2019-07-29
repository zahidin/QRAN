let time = new Date()

export const timeNow = time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })