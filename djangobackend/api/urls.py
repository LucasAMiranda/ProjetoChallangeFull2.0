from django.urls import path
from api import views

urlpatterns=[
    path("api/cliente-list/", views.ClienteList.as_view() , name='cliente-list'),
    path("api/vendedor-list/", views.VendedorList.as_view(), name='vendedor-list' ),
    path("api/venda-list/", views.VendaList.as_view(), name='venda-list'),
    path("api/itensvenda-list/", views.ItemVendasList.as_view(), name='itensvenda-list'),
    path("api/produto-list/", views.ProdutoList.as_view(), name='produto-list'),
    path("api/vendedores/comissoes/", views.VendedorComissaoViewSet.as_view({'get': 'list'}), name='vendedores-comissoes')  

]