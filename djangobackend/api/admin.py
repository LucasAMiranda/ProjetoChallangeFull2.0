from django.contrib import admin
from .models import Produto, Cliente, Vendedor, ConfiguracaoComissao

# Register your models here.

admin.site.register(Produto)
admin.site.register(Cliente)
admin.site.register(Vendedor)


