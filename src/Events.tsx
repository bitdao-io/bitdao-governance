import ReactGA from 'react-ga';

export const callAnalyticEvent = (category: any) => {
    ReactGA.event({
        category: category,
        action: `user clicked on ${category}`
    })
}