import {expect, test} from '@playwright/test'
import pet from '../../data/json/pet.json'

const petAlterado= pet

test.describe.serial('Testes positivos da entidade Pet', async () => {
test('POST pet com sucesso', async ({request})=> {

    // JSON do pet
    // Realiza a requisção, passando o JSON

    const response= await request.post('pet',{
        data: pet
        
})
       //Validações
       
expect(response.status()).toBe(200)
expect (await response.json()).toEqual(pet)
})

test('GET pet com sucesso', async ({ request }) => {
    const response = await request.get(`pet/${pet.id}`)
 
    expect(response.status()).toBe(200)
    const responseJson = await response.json()
 
    expect(responseJson.id).toBe(pet.id)
    expect(responseJson.category.id).toBe(pet.category.id)
    expect(responseJson.category.name).toBe(pet.category.name)
    expect(responseJson.name).toBe(pet.name)
    expect(responseJson.photoUrls).toEqual(pet.photoUrls)
    expect(responseJson.tags[0].id).toBe(pet.tags[0].id)
    expect(responseJson.tags[0].name).toBe(pet.tags[0].name)
    expect(responseJson.tags[1].id).toBe(pet.tags[1].id)
    expect(responseJson.tags[1].name).toBe(pet.tags[1].name)
    expect(responseJson.status).toBe(pet.status)
})

test('PUT pet com sucesso', async ({ request }) => {
       
        petAlterado.status = 'sold'
 
        //console.log(petAlterado)
 
        const response = await request.put('pet', {
            data: petAlterado
        })
 
        expect(response.status()).toBe(200)
        expect(await response.json()).toEqual(petAlterado)
 
    })
test ('DELETE pet com sucesso',async ({request})=> {

    const response=await request.delete(`pet/${petAlterado.id}`)

    expect(response.status()).toBe(200)
    const responseJson= await response.json()
    expect(responseJson.code).toEqual(200)
    expect(responseJson.type).toEqual("unknown")
    expect(responseJson.message).toEqual(petAlterado.id.toString())
}


)
})