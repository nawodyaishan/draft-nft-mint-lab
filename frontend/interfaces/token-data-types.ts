export enum TokenTypes {
    IN_GAME_CURRENCY = 1,
    EXPERIENCE_BOOST = 2,
    PLAYER_CARD = 3,
    STADIUM_VILLAGE_BUILDING = 4
}

export interface NFTPayload {
    address: string
    tokenId: number
}

export interface FTPayload {
    address: string
    tokenId: number
    amount: number
}