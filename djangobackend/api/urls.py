from django.urls import path
from api import views

urlpatterns=[
    path("cliente/", views.ClienteList.as_view()),
    path("vendedor/", views.VendedorList.as_view()),
    path("venda/", views.VendaList.as_view()),
    path("itensvenda/", views.ItemVendasList.as_view()),
    path("produto/", views.ProdutoList.as_view()),
    path("vendedores/comissoes/", views.VendedorComissaoViewSet.as_view({'get': 'list'}), name='vendedores-comissoes')  

]