export type DemoUserType =
    {
        gender: string,
        name: {
            title: string,
            first: string,
            last: string
        },
        location: {
            street: {
                number: number,
                name: string
            },
            city: string,
            state: string,
            country: string,
            postcode: string | number,
            coordinates: {
                latitude: string,
                longitude: string
            },
            timezone: {
                offset: string,
                description: string
            }
        },
        picture: {
            large: string
            medium: string
            thumbnail: string
        }
    }

export type ManageContextType = {
    users: DemoUserType[],
    setUsers: React.Dispatch<React.SetStateAction<DemoUserType[]>>
}