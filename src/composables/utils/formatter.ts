export const convertTo12HourFormat = (time: string): string => {
  const [hours, minutes] = time.split(':').map(Number)
  const period = hours < 12 ? 'AM' : 'PM'
  const adjustedHours = hours % 12 === 0 ? 12 : hours % 12
  return `${adjustedHours}:${minutes.toString().padStart(2, '0')} ${period}`
}

export const convertObjWithRefToObj = (obj: Record<string, Ref>, ignoreKeys: string[] = []) => {
    return Object.fromEntries(
        Object.entries(obj).filter(([key]) => !ignoreKeys.includes(key)).map(([key, value]) => [key, value.value])
    )
}
 const getOrdinalSuffix = (num: number): string => {
  const lastDigit = num % 10
  const lastTwoDigits = num % 100

  if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
    return 'th'
  } else if (lastDigit === 1) {
    return 'st'
  } else if (lastDigit === 2) {
    return 'nd'
  } else if (lastDigit === 3) {
    return 'rd'
  } else {
    return 'th'
  }
}

export const formatDate = (dateString: string | number, type?: 'dateInput'): string => {
  const date = new Date(dateString)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const month = months[date.getMonth()]
  const day = date.getDate()
  const ordinal = getOrdinalSuffix(day)
  const year = date.getFullYear()

   const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    const dateObj = new Date(date)
    if (dateObj.toDateString() === today.toDateString() && !type) {
        return 'Today'
    } else if (dateObj.toDateString() === yesterday.toDateString() && !type) {
        return 'Yesterday'
    } else {
       return `${day}${ordinal} ${month}, ${year}`
    }
}

export const formatFullDate = (timestamp: string) => {
   const date = new Date(timestamp)

  const day = date.getDate().toString().padStart(2, '0')
   const month = date.toLocaleString('default', { month: 'short' })
   const year = date.getFullYear()
   const hours = date.getHours().toString().padStart(2, '0')
   const minutes = date.getMinutes().toString().padStart(2, '0')
   const ampm = date.getHours() >= 12 ? 'PM' : 'AM'
    const ordinal = getOrdinalSuffix(day as any)
   return `${day}${ordinal} ${month}, ${year} - ${hours}:${minutes} ${ampm}`
}

export const parseToNumber = (amount: string) => {
  if (typeof amount === 'number') return amount
  return parseFloat(amount.replace(',', '').replace(' ', ''))
}

export const formatTime = (dateData: string | Record<string, any>) => {
if (typeof dateData === 'object') dateData = dateData.toDate()
  const date = new Date(dateData as string)
  const d = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000)

  const offset = date.getTimezoneOffset() / 60
  const hours = date.getHours()
  d.setHours(hours - offset)

  const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d)
  const month = new Intl.DateTimeFormat('en', { month: 'short' }).format(d)
  const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)
  const hour = new Intl.DateTimeFormat('en', {
    hour: '2-digit',
    timeZone: 'GMT'
  }).format(d)
  let minute = new Intl.DateTimeFormat('en', { minute: 'numeric' }).format(d)
  if (minute.length === 1) {
    minute = `0${minute}`
  }
  return {
    date: `${month} ${day}, ${year}`,
    time: `${hour.split(' ')[0]} : ${minute} ${hour.split(' ')[1]}`
  }
}


export const formateDateInDays = (dateString: string): string => {
  const date = new Date(dateString)
  const today = new Date()
  const diffTime = Math.abs(today.getTime() - date.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 1) {
    return 'today'
  } else if (diffDays === 2) {
    return 'yesterday'
  } else {
    return `${diffDays} days ago`
  }
}

export const formatTaskTag = (tag: string): string => {
  const dash_removed = tag.replace(/_/g, ' ')
  const words = dash_removed.split(' ')
   const capitalizedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1)
  })
  return capitalizedWords.join(' ')
}
export const capitalizeString = (string: string): string => {
  if (!string) return ''
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}

export const convertTextToHTMl = (text: string) => {
  const textArray = text.split(/(\s|\n)/)
  const newTextArray = [] as string[]
  textArray.forEach((word: string) => {
    if (word.match(/^(http|https):\/\/[^ "]+$/)) {
      newTextArray.push(`<a href="${word}" class="external_link" target="_blank">${word}</a>`)
    } else {
      newTextArray.push(word)
    }
  })
  const formatedtext = newTextArray.join(' ')
  return `<em class="formatted-text">${formatedtext}</em>`
}

export const truncateString = (input: string, maxLength = 80): string => {
  if (!input) return ''
    if (input.length <= maxLength) {
        return input
    } else {
        return input.slice(0, maxLength) + '...'
    }
}
export const sortByDate = (objects, sortType = 'created_at', order: 'DESC' | 'ASCE') => {
  objects.sort((a, b) => {
    const dateA = new Date(a[sortType]).toISOString()
    const dateB = new Date(b[sortType]).toISOString()
    if (order === 'DESC') {
      if (dateA < dateB) return -1
      if (dateA > dateB) return 1
    } else {
      if (dateA > dateB) return -1
      if (dateA < dateB) return 1
    }
    return 0
  })
  return objects
}


export const formatDateString = (dateStr: string, options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }): string => {
  const date = new Date(dateStr)


  return new Intl.DateTimeFormat('en-US', options).format(date)
}
