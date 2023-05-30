from rest_framework import serializers
from .models import (
    Cliente, 
    Vendedor,
    Produto,
    Venda,
    ItemVenda,
)


class ProdutoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Produto
        fields = '__all__'


class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = '__all__'


class VendedorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendedor
        fields = '__all__'


class VendaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Venda
        fields = '__all__'


class ItemVendaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemVenda
        fields = '__all__'


class VendedorComissaoSerializer(serializers.ModelSerializer):
    total_comissao = serializers.FloatField()

    class Meta:
        model = Vendedor
        fields = ['id', 'nome', 'total_comissao']