export const TIMETABLE_GRAPHQL_QUERY = `query timetable($uid: String!, $from: Float, $to: Float) {
    timetable(uid: $uid, from: $from, to: $to) {
      id
      messages {
        text
        level
        __typename
      }
      plannings {
        id
        type
        label
        default
        messages {
          text
          level
          __typename
        }
        events {
          id
          startDateTime
          endDateTime
          day
          duration
          urls
          course {
            id
            label
            color
            url
            type
            __typename
          }
          teachers {
            name
            email
            __typename
          }
          rooms {
            label
            __typename
          }
          groups {
            label
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
  }
`

export interface Course {
  id: string
  label: string
  color: string
  url?: string
  type: string
  __typename: string
}

export interface Teacher {
  name: string
  email: string
  __typename: string
}

export interface Room {
  label: string
  __typename: string
}

export interface Group {
  label: string
  __typename: string
}

export interface Event {
  id: string
  startDateTime: string
  endDateTime: string
  day: number
  duration: number
  urls: string[]
  course: Course
  teachers: Teacher[]
  rooms: Room[]
  groups: Group[]
  __typename: string
}

export interface Message {
  text: string
  level: string
  __typename: string
}

export interface Planning {
  id: string
  type: string
  label: string
  default: boolean
  messages: Message[]
  events: Event[]
  __typename: string
  }

export interface Timetable {
id: string
messages: any[]
plannings: Planning[]
__typename: string
}
