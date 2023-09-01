
import './Footer.css'


export const Footer = () => {
  return (
      <footer>
          <section className='container-footer'>
            <div className='box-dev'>
              <img src='/logoAVA2.png' alt='logo' />
              <p>
                  Esta solução foi desenvolvida pelo <a href="http://www.c3.furg.br">Centro de Ciências Computacionais</a>  da <a href="https://www.furg.br">FURG</a>, em parceria com a <a href="https://www.sead.furg.br/">SEaD</a>, através de projeto financiado pela <a href="https://www.capes.gov.br/">CAPES</a>. Solução de código aberto (Open Source) licensiada sob a licença <a href="https://www.gnu.org/licenses/gpl-3.0.pt-br.html">GPLv3</a> .
              </p>
            </div>
            <div className='box-contact'>
                <h4>Contato</h4>
                <p>
                    Centro de Ciências Computacionais (C3)
                    Universidade Federal do Rio Grande
                    Av. Itália, km 8, Bairro Carreiros
                    96203-900, Rio Grande - RS, Brasil
                </p>
                <a href="tel://005553999594874"> +55 53 32336886</a>
                <p>
                  <a href="mailto:ti.c3@furg.br">ti.c3@furg.br</a>
                </p>
                <p>
                  <a href="https://www.c3.furg.br">www.c3.furg.br</a>
                </p>
            </div>
          </section>
          <div className='by'>
            <p>Copyright © Centro de Ciências Computacionais 2023</p>
            <p>Todos os direitos reservado</p>
          </div>
      </footer>
  )
}