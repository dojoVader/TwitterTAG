export interface TwitterLDJSON {
    "@context": string
    "@type": string
    dateCreated: string
    mainEntity: MainEntity
    contentRating: string
    relatedLink: string[]
}

export interface MainEntity {
    "@type": string
    additionalName: string
    description: string
    givenName: string
    homeLocation: HomeLocation
    identifier: string
    image: Image
    interactionStatistic: InteractionStatistic[]
    url: string
}

export interface HomeLocation {
    "@type": string
    name: string
}

export interface Image {
    "@type": string
    contentUrl: string
    thumbnailUrl: string
}

export interface InteractionStatistic {
    "@type": string
    interactionType: string
    name: string
    userInteractionCount: number
}
