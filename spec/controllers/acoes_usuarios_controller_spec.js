 const supertest = require('supertest');
const  AcoesUsuario = require('../../app/models/acoes_usuario');
const app = require('../../app.js');
const request = supertest(app);

const TOKEN= "87uj99882320of"

describe("AcoesUsuariosController", () =>{
    beforeEach(async() => {
      await AcoesUsuario.deleteMany({}, async(err, removed) => {
        await AcoesUsuario.create({
          codigo_usuario: 5,
          codigo_acao: "ciel3",
          valor_investido: 1500000,
          percentual: 7.20
          
        });
  
        await AcoesUsuario.create({
            codigo_usuario: 6,
            codigo_acao: "abev3",
            valor_investido: 5500000,
            percentual: 8.33
          });
        });
      });
    });

    describe('POST/acoes-usuarios.json-Deve retornar se o controller acoes-usuarios(AcoesUsuariosController)',() =>{

        it('cadastrou um registro acoes_usuario', async(done) =>{

            body = {
              codigo_usuario:11,
              codigo_acao:"abev4",
              valor_investido:99000000,
              percentual: 6.13
            }

            const response = await request.post('/acoes-usuarios.json').set('token',TOKEN).send(body);
            expect(response.status).toBe(201);
            done();
        });
      });


     describe('GET/acoes-usuarios.json - Deve Buscar  registros cadastrados',() =>{
      it('Deve retornar o Statuscode 200 ', async(done) =>{
        const response = await request.get('/acoes-usuarios.json').set('token',TOKEN);
        expect(response.status).toBe(200);
        done();
      });
     });


     describe('PUT/acoes-usuarios.json - Deve atualizar registro ',() =>{
      it('Deve retornar o Statuscode 200 ', async(done) =>{

        const acao_usuario = await AcoesUsuario.create({
          codigo_usuario: 1,
          codigo_acao: 'natu3',
          valor_investido: 12300,
          percentual: 3.1
        });

        body = {
          codigo_usuario: 1,
          codigo_acao: 'natu4',
          valor_investido: 6200
        }

        const response = await request.put(`/acoes-usuarios/${acao_usuario._id}.json`).set('token',TOKEN).send(body);
        expect(response.status).toBe(200);
        done();
      });
    });

      describe('DELETE/acoes-usuarios.json - Deve deletar registro ',() =>{
      it('Deve retornar o Statuscode 200 ', async(done) =>{

        const acao_usuario = await AcoesUsuario.create({
          codigo_usuario: 4,
          codigo_acao:"car",
          valor_investido: 8000,
          percentual: 20
        })  
        const response = await request.delete(`/acoes-usuarios/${acao_usuario._id}.json`).set('token',TOKEN);
        expect(response.status).toBe(200);
        done();
     });
    });

    