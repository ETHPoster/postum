import { querySubgraph, AdminRole } from "."

export async function adminsByForum(
  forum: string,
  pageSize: number,
  pageIndex: number
) {
  const skip = pageSize * pageIndex
  const query = `{
    adminRoles(where: { deleted: false }, forum: "${forum}", first: ${pageSize}, skip: ${skip}) {
      id
      user {
        id
      }
      forum {
        id
      }
      deleted
    }
  }`
  const admins: AdminRole[] = (await querySubgraph(query)).data.adminRoles
  return admins
}
/*
type Forum @entity {
  id: ID!
  title: String!
  categories: [Category!]! @derivedFrom(field: "forum")
  threads: [Thread!]! @derivedFrom(field: "forum")
  admin_roles: [AdminRole!]! @derivedFrom(field: "forum")
  deleted: Boolean!
}

type Category @entity {
  id: ID!
  title: String!
  description: String!
  forum: Forum!
  threads: [Thread!]! @derivedFrom(field: "category")
  deleted: Boolean!
}

type Thread @entity {
  id: ID!
  author: User!
  title: String!
  forum: Forum!
  category: Category
  posts: [Post!]! @derivedFrom(field: "thread")
  deleted: Boolean!
}

type Post @entity {
  id: ID!
  author: User!
  content: String!
  reply_to_post: Post
  thread: Thread!
  deleted: Boolean!
}

type User @entity {
  id: ID!
  admin_roles: [AdminRole!]! @derivedFrom(field: "user")
  threads: [Thread!]! @derivedFrom(field: "author")
  posts: [Post!]! @derivedFrom(field: "author")
}

type AdminRole @entity {
  id: ID!
  user: User!
  forum: Forum!
  deleted: Boolean!
}
*/