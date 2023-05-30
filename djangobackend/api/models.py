from django.db import models
from django.db.models import Sum

# Create your models here.

# Create your models here.
class Cliente(models.Model):
    nome = models.CharField(max_length=100)
    email = models.EmailField()
    telefone = models.CharField(max_length=20)

    def __str__(self):
        return self.nome
    

class Vendedor(models.Model):
    nome = models.CharField(max_length=100)
    email = models.EmailField()
    telefone = models.CharField(max_length=20)

    def calcular_total_comissao(self, periodo_inicio, periodo_fim):
        vendas_periodo = self.vendas.filter(data_hora__range=[periodo_inicio, periodo_fim])
        total_comissao = vendas_periodo.aggregate(Sum('itens__comissao'))['itens__comissao__sum'] or 0
        return total_comissao


    def __str__(self):
        return self.nome
    

class Produto(models.Model):
    codigo = models.CharField(max_length=50)
    descricao = models.CharField(max_length=100)
    valor_unitario = models.DecimalField(max_digits=10, decimal_places=2)
    percentual_comissao = models.DecimalField(max_digits=4, decimal_places=2)

    def __str__(self):
        return self.descricao
    
    
class Venda(models.Model):
    numero_nota_fiscal = models.CharField(max_length=50)
    data_hora = models.DateTimeField()
    Cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    vendedor = models.ForeignKey(Vendedor, on_delete=models.CASCADE)
    produtos = models.ManyToManyField(Produto, through='ItemVenda')

    def __str__(self):
        return self.numero_nota_fiscal
    
    
class ItemVenda(models.Model):
    venda = models.ForeignKey(Venda, on_delete=models.CASCADE)
    produto = models.ForeignKey(Produto, on_delete=models.CASCADE)
    quantidade = models.IntegerField()

    def calcular_comissao(self):
        if self.venda.data_hora.weekday() == 0:
            min_comissao = 0.03
            max_comissao = 0.05
        else:
            min_comissao = 0
            max_comissao = 1

        percentual_comissao = self.produto.percentual_comissao

        if percentual_comissao < min_comissao:
            percentual_comissao = min_comissao
        elif percentual_comissao > max_comissao:
            percentual_comissao = max_comissao

        return self.produto.valor_unitario * self.quantidade * percentual_comissao
    
    def __str__(self):
        return f"{self.venda} - {self.produto}"


class ConfiguracaoComissao(models.Model):
    dia_semana = models.PositiveSmallIntegerField(unique=True)
    min_comissao = models.DecimalField(max_digits=4, decimal_places=2)
    max_comissao = models.DecimalField(max_digits=4, decimal_places=2)

    def __str__(self):
        return f"Configuração para dia {self.dia_semana}"
