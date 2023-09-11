const useDate = () => {
    const currentDate = new Date()
const year = currentDate.getFullYear()
const month = currentDate.getMonth() + 1
const day = currentDate.getDate()

const date = `${year}-${month}-${day}`
return date;
}

export default useDate