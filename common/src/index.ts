import { postCreateSchema, postEditSchema, PostCreateInput, PostEditInput } from "./blog"
import { signInSchema, signUpSchema, SignInInput, SignUpInput } from "./user"

export const pcs = postCreateSchema
export const pes = postEditSchema
export type pci = PostCreateInput
export type pei = PostEditInput

export const sis = signInSchema
export const sus = signUpSchema
export type sii = SignInInput
export type sui = SignUpInput