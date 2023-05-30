from django.shortcuts import render
from rest_framework.generics import ListAPIView
from .serializers import (
    ClienteSerializer,
    VendedorSerializer,
    VendaSerializer,
    ItemVendaSerializer,
    ProdutoSerializer
)
from .models import Cliente, Vendedor, Venda, ItemVenda, Produto
from rest_framework import viewsets
from rest_framework.response import Response
from .serializers import VendedorComissaoSerializer

# Create your views here.

class ClienteList(ListAPIView):
  queryset = Cliente.objects.all()
  serializer_class = ClienteSerializer


class VendedorList(ListAPIView):
  queryset = Vendedor.objects.all()
  serializer_class = VendedorSerializer


class VendaList(ListAPIView):
  queryset = Venda.objects.all()
  serializer_class = VendaSerializer


class ItemVendasList(ListAPIView):
  queryset = ItemVenda.objects.all()
  serializer_class = ItemVendaSerializer


class ProdutoList(ListAPIView):
  queryset = Produto.objects.all()
  serializer_class = ProdutoSerializer


class VendedorComissaoViewSet(viewsets.ViewSet):
    def list(self, request):
        periodo_inicio = request.GET.get('periodo_inicio')
        periodo_fim = request.GET.get('periodo_fim')

        vendedores = Vendedor.objects.all()
        for vendedor in vendedores:
            total_comissao = vendedor.calcular_total_comissao(periodo_inicio, periodo_fim)
            vendedor.total_comissao = total_comissao

        serializer = VendedorComissaoSerializer(vendedores, many=True)
        return Response(serializer.data)