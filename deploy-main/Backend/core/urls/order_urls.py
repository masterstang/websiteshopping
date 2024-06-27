from django.urls import path
from core.views import order_views as views


urlpatterns = [
    path('',views.getOrders,name="allorders"),
    path('add/',views.addOrderItems,name="orders-add"),
    path('myorders/',views.getMyOrders,name="myorders"),
    path('slip/',views.uploadslip,name="upload_slip"),
    path('<str:pk>/confirm/',views.updateOrderToComfirm,name="Confirm"),
    path('<str:pk>/',views.getOrderById,name="user-order"),
    path('<str:pk>/pay/',views.updateOrderToPaid,name="pay"),
]
