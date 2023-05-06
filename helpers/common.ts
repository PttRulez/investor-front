export const readableNumber = (n) => {
	if(n > 1_000_000_000_000) {
		n = (n / 1_000_000_000_000).toFixed(2)
		return `${n} трлн.`
	} if(n > 1_000_000_000) {
		n = (n / 1_000_000_000).toFixed(2)
		return `${n} млрд.`
	} else if(n > 1_000_000) {
		n = (n / 1_000_000).toFixed(2)
		return `${n} млн.`
	}
}
