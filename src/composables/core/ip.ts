


export const useIP = () => {
  const ip = useState<string>('ip', () => null as any)

    if (process.server) {
        const { ssrContext } = useNuxtApp()
        ip.value = ssrContext?.event.context.ip || null
    }

  return { ip }
}
