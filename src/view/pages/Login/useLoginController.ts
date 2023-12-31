// modulo de patterns

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod";
// import { httpClient } from "../../../app/services/httpClient";
import { useMutation } from "@tanstack/react-query";
import { toast } from 'react-hot-toast';
import { authService } from "../../../app/services/authService";
import { SigninParams } from "../../../app/services/authService/signin";

const schema = z.object({
  email: z.string().nonempty("Email é obrigatório").email('Informe um e-mail válido'),
  password: z.string().nonempty('Senha é obrigatória').min(8, 'Senha deve conter pelo menos 8 dígitos')
})

// type FormData = {email: string; password:string}
type FormData = z.infer<typeof schema>

export function useLoginController() {
  const { 
    handleSubmit: hookFormSubmit, 
    register, 
    formState: { errors } 
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const { mutateAsync, isLoading } = useMutation({
    // mutationKey: ['signup'],
    mutationFn: async (data: SigninParams) => {
      return authService.signin(data);
    },
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
     // console.log("Chama a API com:", data)
    // const {accessToken} = await mutateAsync(data);
    await mutateAsync(data);
 
    // console.log({accessToken})
    
   } catch (error) {
    toast.error("Credenciais inválidas!")
   }
  });
  
  // console.log({isLoading})

  return { handleSubmit, register, errors, isLoading };
}
