import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "react-hot-toast"

import { useMutation } from "@tanstack/react-query"

import { authService } from "../../../app/services/authService";
import { SignupParams } from "../../../app/services/authService/signup";


const schema = z.object({
  name: z.string().nonempty("Nome é obrigatório"),
  email: z.string().nonempty("Email é obrigatório").email('Informe um e-mail válido'),
  password: z.string().nonempty('Senha é obrigatória').min(8, 'Senha deve conter pelo menos 8 dígitos')
})

type FormData = z.infer<typeof schema>


export default function useRegisterController() {
  const { 
    handleSubmit: hookFormHandleSubmit, 
    register, 
    formState: { errors } 
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });


  const { mutateAsync, isLoading } = useMutation({
    // mutationKey: ['signup'],
    mutationFn: async (data: SignupParams) => {
      return authService.signup(data);
    },
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
     // console.log("Chama a API com:", data)
    // const {accessToken} = await mutateAsync(data);
    await mutateAsync(data);
 
    // console.log({accessToken})
    
   } catch (error) {
    toast.error("Ocorreu um erro ao criar sua conta!")
   }
  });
  
  // console.log({isLoading})

  return { register, errors, handleSubmit, isLoading }
}
//2:23