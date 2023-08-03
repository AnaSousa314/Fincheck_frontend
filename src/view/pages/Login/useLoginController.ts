// modulo de patterns

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod";

const schema = z.object({
  email: z.string().nonempty("Email é obrigatório").email('Informe um e-mail válido'),
  password: z.string().nonempty('Senha é obrigatória').min(8, 'Senha deve conter pelo menos 8 dígitos')
})

// type FormData = {email: string; password:string}
type FormData = z.infer<typeof schema>

export function useLoginController() {
  const { 
    handleSubmit: hookFormHandleSubmit, 
    register, 
    formState: { errors } 
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const handleSubmit = hookFormHandleSubmit((data) => {
    // console.log('Form submetido')
    // console.log({data})
    // const result = schema.safeParse(data);
    // console.log(result)
    // Presumir que os dados do form estão válidos
    console.log("Chama a API com:", data)
    
    
  });
  console.log(errors)

  return { handleSubmit, register, errors };
}
